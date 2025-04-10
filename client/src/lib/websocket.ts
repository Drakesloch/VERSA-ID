// WebSocket utility for VERSA-ID real-time communication

let socket: WebSocket | null = null;
const listeners = new Map<string, Set<(data: any) => void>>();

/**
 * Get the WebSocket URL with the correct protocol and path
 */
function getWebSocketUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host}/api/ws`;
}

/**
 * Connect to the VERSA-ID WebSocket server
 */
export function connectWebSocket(versaId?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // If socket is already connected, just subscribe and resolve
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (versaId) {
        try {
          subscribeToVersaId(versaId);
        } catch (error) {
          console.warn('Failed to subscribe with existing connection:', error);
          // Continue anyway, don't reject
        }
      }
      resolve();
      return;
    }
    
    // If socket is in connecting state, just wait
    if (socket && socket.readyState === WebSocket.CONNECTING) {
      const onOpenHandler = () => {
        if (versaId) {
          try {
            subscribeToVersaId(versaId);
          } catch (error) {
            console.warn('Failed to subscribe after connection:', error);
            // Continue anyway, don't reject
          }
        }
        socket?.removeEventListener('open', onOpenHandler);
        resolve();
      };
      
      socket.addEventListener('open', onOpenHandler);
      return;
    }
    
    // If socket exists but is in closing or closed state, clean it up
    if (socket && (socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED)) {
      socket = null;
    }

    try {
      // Create new connection
      socket = new WebSocket(getWebSocketUrl());
      
      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (socket && socket.readyState === WebSocket.CONNECTING) {
          console.warn('WebSocket connection timeout');
          socket.close();
          socket = null;
          reject(new Error('WebSocket connection timeout'));
        }
      }, 10000); // 10 second timeout
      
      socket.onopen = () => {
        console.log('WebSocket connection established');
        clearTimeout(connectionTimeout);
        
        // Dispatch custom event for connection opening
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('ws:open'));
        }
        
        if (versaId) {
          try {
            subscribeToVersaId(versaId);
          } catch (error) {
            console.warn('Failed to subscribe after connection established:', error);
            // Continue anyway, don't reject
          }
        }
        resolve();
      };

      socket.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.code} ${event.reason || ''}`);
        clearTimeout(connectionTimeout);
        
        // Dispatch custom event for connection closing
        if (typeof window !== 'undefined') {
          const closeEvent = new CustomEvent('ws:close', { 
            detail: { code: event.code, reason: event.reason } 
          });
          window.dispatchEvent(closeEvent);
        }
        
        // Only attempt reconnect if this wasn't an intentional close
        if (event.code !== 1000) {
          // Attempt to reconnect after a delay with exponential backoff
          // Use a minimum of 5 seconds, maximum of 30 seconds
          const reconnectDelay = Math.min(30000, 5000 * (Math.pow(1.5, Math.floor(Math.random() * 5))));
          console.log(`Will attempt to reconnect in ${reconnectDelay/1000} seconds`);
          
          setTimeout(() => {
            if (versaId) {
              connectWebSocket(versaId).catch(error => {
                console.warn('Reconnection attempt failed:', error);
              });
            }
          }, reconnectDelay);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Don't reject here, wait for onclose which will be called after an error
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const type = data.type;
          
          if (listeners.has(type)) {
            listeners.get(type)?.forEach(callback => {
              callback(data);
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      reject(error);
    }
  });
}

/**
 * Subscribe to VERSA-ID notifications
 */
function subscribeToVersaId(versaId: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not connected');
  }

  socket.send(JSON.stringify({
    type: 'subscribe',
    versaId
  }));
}

/**
 * Register a callback for a specific message type
 */
export function on(type: string, callback: (data: any) => void) {
  if (!listeners.has(type)) {
    listeners.set(type, new Set());
  }
  
  listeners.get(type)?.add(callback);
  
  // Return unsubscribe function
  return () => {
    const typeListeners = listeners.get(type);
    if (typeListeners) {
      typeListeners.delete(callback);
      if (typeListeners.size === 0) {
        listeners.delete(type);
      }
    }
  };
}

/**
 * Disconnect the WebSocket
 */
export function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  // Clear all listeners
  listeners.clear();
}

/**
 * Send a message through the WebSocket
 */
export function sendMessage(message: object) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not connected');
  }
  
  socket.send(JSON.stringify(message));
}