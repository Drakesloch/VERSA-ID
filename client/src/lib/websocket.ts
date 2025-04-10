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
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (versaId) {
        subscribeToVersaId(versaId);
      }
      resolve();
      return;
    }

    try {
      socket = new WebSocket(getWebSocketUrl());
      
      socket.onopen = () => {
        console.log('WebSocket connection established');
        if (versaId) {
          subscribeToVersaId(versaId);
        }
        resolve();
      };

      socket.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
        // Attempt to reconnect after a delay
        setTimeout(() => {
          if (versaId) {
            connectWebSocket(versaId);
          }
        }, 5000);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
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