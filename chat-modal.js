/**
 * OmniBazaar Chat Modal Component
 * 
 * This provides a P2P chat interface that can be overlaid on any page.
 * It integrates with the OmniBazaar chat service for encrypted messaging.
 */

class ChatModal {
    constructor() {
        this.isOpen = false;
        this.currentRoom = null;
        this.messages = [];
        this.createModal();
        this.attachEventListeners();
    }
    
    createModal() {
        // Create modal HTML
        const modalHTML = `
            <div id="chatModal" class="chat-modal-overlay" style="display: none;">
                <div class="chat-modal">
                    <div class="chat-header">
                        <div class="chat-header-left">
                            <h3 class="chat-title">💬 Chat</h3>
                            <span class="chat-status" id="chatStatus">Connecting...</span>
                        </div>
                        <div class="chat-header-right">
                            <button class="chat-minimize" onclick="chatModal.minimize()">−</button>
                            <button class="chat-close" onclick="chatModal.close()">×</button>
                        </div>
                    </div>
                    
                    <div class="chat-content">
                        <!-- Room List -->
                        <div class="chat-sidebar">
                            <div class="chat-section-title">Conversations</div>
                            <div class="chat-rooms" id="chatRooms">
                                <div class="chat-room active" data-room="support">
                                    <div class="room-avatar">🆘</div>
                                    <div class="room-info">
                                        <div class="room-name">Support</div>
                                        <div class="room-preview">Welcome to OmniBazaar!</div>
                                    </div>
                                    <div class="room-badge">1</div>
                                </div>
                                <div class="chat-room" data-room="seller">
                                    <div class="room-avatar">👤</div>
                                    <div class="room-info">
                                        <div class="room-name">John Doe</div>
                                        <div class="room-preview">About the camera...</div>
                                    </div>
                                </div>
                                <div class="chat-room" data-room="general">
                                    <div class="room-avatar">🌐</div>
                                    <div class="room-info">
                                        <div class="room-name">General</div>
                                        <div class="room-preview">128 online</div>
                                    </div>
                                </div>
                            </div>
                            <button class="new-chat-btn" onclick="chatModal.startNewChat()">
                                + New Conversation
                            </button>
                        </div>
                        
                        <!-- Chat Area -->
                        <div class="chat-main">
                            <div class="chat-messages" id="chatMessages">
                                <div class="message-date">Today</div>
                                <div class="message received">
                                    <div class="message-avatar">🆘</div>
                                    <div class="message-content">
                                        <div class="message-sender">Support Bot</div>
                                        <div class="message-text">
                                            Welcome to OmniBazaar Chat! This is a secure, peer-to-peer messaging system. 
                                            All messages are encrypted end-to-end.
                                        </div>
                                        <div class="message-time">10:30 AM</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="chat-input-area">
                                <div class="chat-typing" id="typingIndicator" style="display: none;">
                                    <span class="typing-dots">●●●</span> Someone is typing...
                                </div>
                                <form class="chat-form" onsubmit="chatModal.sendMessage(event)">
                                    <input 
                                        type="text" 
                                        class="chat-input" 
                                        id="chatInput" 
                                        placeholder="Type a message..."
                                        autocomplete="off"
                                    >
                                    <button type="submit" class="chat-send">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Minimized Chat Button -->
            <button id="chatButton" class="chat-float-button" onclick="chatModal.open()">
                <span class="chat-icon">💬</span>
                <span class="chat-badge" id="chatBadge" style="display: none;">0</span>
            </button>
        `;
        
        // Add styles
        const styles = `
            <style>
                /* Chat Modal Styles */
                .chat-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .chat-modal {
                    background: white;
                    width: 90%;
                    max-width: 80rem;
                    height: 70vh;
                    max-height: 60rem;
                    border-radius: 1.2rem;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
                    animation: slideUp 0.3s ease;
                }
                
                @keyframes slideUp {
                    from { transform: translateY(2rem); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .chat-header {
                    background: #373373;
                    color: white;
                    padding: 1.6rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .chat-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1.6rem;
                }
                
                .chat-title {
                    margin: 0;
                    font-size: 1.8rem;
                    font-weight: 600;
                }
                
                .chat-status {
                    font-size: 1.3rem;
                    opacity: 0.8;
                }
                
                .chat-header-right {
                    display: flex;
                    gap: 0.8rem;
                }
                
                .chat-minimize, .chat-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2.4rem;
                    cursor: pointer;
                    padding: 0.4rem 0.8rem;
                    line-height: 1;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                
                .chat-minimize:hover, .chat-close:hover {
                    opacity: 1;
                }
                
                .chat-content {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                }
                
                .chat-sidebar {
                    width: 28rem;
                    background: #F7F8FA;
                    border-right: 0.1rem solid #E5E5E5;
                    display: flex;
                    flex-direction: column;
                }
                
                .chat-section-title {
                    padding: 1.6rem 2rem;
                    font-weight: 600;
                    color: #3E4153;
                    border-bottom: 0.1rem solid #E5E5E5;
                }
                
                .chat-rooms {
                    flex: 1;
                    overflow-y: auto;
                }
                
                .chat-room {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    padding: 1.6rem 2rem;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    position: relative;
                }
                
                .chat-room:hover {
                    background: #EEEFF5;
                }
                
                .chat-room.active {
                    background: #E8E7F7;
                }
                
                .room-avatar {
                    width: 4rem;
                    height: 4rem;
                    background: #373373;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    flex-shrink: 0;
                }
                
                .room-info {
                    flex: 1;
                    overflow: hidden;
                }
                
                .room-name {
                    font-weight: 600;
                    color: #3E4153;
                    margin-bottom: 0.2rem;
                }
                
                .room-preview {
                    font-size: 1.3rem;
                    color: #8E909B;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .room-badge {
                    position: absolute;
                    top: 1.6rem;
                    right: 2rem;
                    background: #373373;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 600;
                    padding: 0.2rem 0.6rem;
                    border-radius: 1rem;
                    min-width: 2rem;
                    text-align: center;
                }
                
                .new-chat-btn {
                    margin: 1.6rem;
                    padding: 1.2rem;
                    background: #373373;
                    color: white;
                    border: none;
                    border-radius: 0.8rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .new-chat-btn:hover {
                    background: #4B4881;
                }
                
                .chat-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .chat-messages {
                    flex: 1;
                    padding: 2rem;
                    overflow-y: auto;
                    background: white;
                }
                
                .message-date {
                    text-align: center;
                    color: #8E909B;
                    font-size: 1.3rem;
                    margin: 2rem 0;
                }
                
                .message {
                    display: flex;
                    gap: 1.2rem;
                    margin-bottom: 2rem;
                }
                
                .message.sent {
                    flex-direction: row-reverse;
                }
                
                .message-avatar {
                    width: 3.6rem;
                    height: 3.6rem;
                    background: #373373;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    flex-shrink: 0;
                }
                
                .message.sent .message-avatar {
                    background: #4B4881;
                }
                
                .message-content {
                    max-width: 70%;
                }
                
                .message-sender {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #6F727F;
                    margin-bottom: 0.4rem;
                }
                
                .message.sent .message-sender {
                    text-align: right;
                }
                
                .message-text {
                    background: #F7F8FA;
                    padding: 1.2rem 1.6rem;
                    border-radius: 0.8rem;
                    line-height: 1.6;
                }
                
                .message.sent .message-text {
                    background: #373373;
                    color: white;
                }
                
                .message-time {
                    font-size: 1.2rem;
                    color: #8E909B;
                    margin-top: 0.4rem;
                }
                
                .message.sent .message-time {
                    text-align: right;
                }
                
                .chat-input-area {
                    border-top: 0.1rem solid #E5E5E5;
                    background: white;
                }
                
                .chat-typing {
                    padding: 0.8rem 2rem;
                    font-size: 1.3rem;
                    color: #8E909B;
                }
                
                .typing-dots {
                    animation: pulse 1.5s infinite;
                }
                
                .chat-form {
                    display: flex;
                    gap: 1.2rem;
                    padding: 1.6rem 2rem;
                }
                
                .chat-input {
                    flex: 1;
                    padding: 1.2rem 1.6rem;
                    border: 0.1rem solid #D2D3D7;
                    border-radius: 0.8rem;
                    font-size: 1.5rem;
                    outline: none;
                    transition: border-color 0.3s ease;
                }
                
                .chat-input:focus {
                    border-color: #373373;
                }
                
                .chat-send {
                    background: #373373;
                    color: white;
                    border: none;
                    padding: 1.2rem 2rem;
                    border-radius: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .chat-send:hover {
                    background: #4B4881;
                }
                
                /* Floating Chat Button */
                .chat-float-button {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 6rem;
                    height: 6rem;
                    background: #373373;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 2.4rem;
                    cursor: pointer;
                    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .chat-float-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0.6rem 1.6rem rgba(0, 0, 0, 0.3);
                }
                
                .chat-badge {
                    position: absolute;
                    top: -0.4rem;
                    right: -0.4rem;
                    background: #ff3333;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 600;
                    padding: 0.2rem 0.6rem;
                    border-radius: 1rem;
                    min-width: 2rem;
                    text-align: center;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .chat-modal {
                        width: 100%;
                        height: 100vh;
                        max-height: none;
                        border-radius: 0;
                    }
                    
                    .chat-sidebar {
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        z-index: 10;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    
                    .chat-sidebar.open {
                        transform: translateX(0);
                    }
                }
            </style>
        `;
        
        // Add to page
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    attachEventListeners() {
        // Room selection
        document.querySelectorAll('.chat-room').forEach(room => {
            room.addEventListener('click', (e) => {
                const roomId = e.currentTarget.dataset.room;
                this.selectRoom(roomId);
            });
        });
        
        // Handle clicks outside modal
        document.getElementById('chatModal').addEventListener('click', (e) => {
            if (e.target.id === 'chatModal') {
                this.close();
            }
        });
        
        // Simulate incoming messages
        this.startMessageSimulation();
    }
    
    open() {
        document.getElementById('chatModal').style.display = 'flex';
        document.getElementById('chatButton').style.display = 'none';
        this.isOpen = true;
        this.updateStatus('Connected');
        
        // Focus input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 100);
    }
    
    close() {
        document.getElementById('chatModal').style.display = 'none';
        document.getElementById('chatButton').style.display = 'flex';
        this.isOpen = false;
    }
    
    minimize() {
        this.close();
    }
    
    selectRoom(roomId) {
        // Update active room
        document.querySelectorAll('.chat-room').forEach(room => {
            room.classList.remove('active');
        });
        document.querySelector(`[data-room="${roomId}"]`).classList.add('active');
        
        // Clear badge for this room
        const badge = document.querySelector(`[data-room="${roomId}"] .room-badge`);
        if (badge) {
            badge.style.display = 'none';
        }
        
        // Load room messages
        this.loadRoomMessages(roomId);
    }
    
    loadRoomMessages(roomId) {
        const messagesContainer = document.getElementById('chatMessages');
        
        // Clear current messages
        messagesContainer.innerHTML = '<div class="message-date">Today</div>';
        
        // Load room-specific messages
        if (roomId === 'seller') {
            messagesContainer.innerHTML += `
                <div class="message received">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-sender">John Doe</div>
                        <div class="message-text">
                            Hi! Thanks for your interest in the Canon AE-1. It's in excellent condition!
                        </div>
                        <div class="message-time">2:15 PM</div>
                    </div>
                </div>
                <div class="message sent">
                    <div class="message-avatar">👤</div>
                    <div class="message-content">
                        <div class="message-sender">You</div>
                        <div class="message-text">
                            Great! Does it come with the original lens?
                        </div>
                        <div class="message-time">2:18 PM</div>
                    </div>
                </div>
                <div class="message received">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-sender">John Doe</div>
                        <div class="message-text">
                            Yes, it includes the Canon FD 50mm f/1.8 lens. Everything is original!
                        </div>
                        <div class="message-time">2:20 PM</div>
                    </div>
                </div>
            `;
        } else if (roomId === 'general') {
            messagesContainer.innerHTML += `
                <div class="message received">
                    <div class="message-avatar">🌟</div>
                    <div class="message-content">
                        <div class="message-sender">CryptoTrader</div>
                        <div class="message-text">
                            Anyone know when the next XOM staking rewards distribution is?
                        </div>
                        <div class="message-time">3:45 PM</div>
                    </div>
                </div>
                <div class="message received">
                    <div class="message-avatar">💎</div>
                    <div class="message-content">
                        <div class="message-sender">DiamondHands</div>
                        <div class="message-text">
                            Should be tomorrow at 12:00 UTC according to the docs
                        </div>
                        <div class="message-time">3:47 PM</div>
                    </div>
                </div>
            `;
        } else {
            // Support room
            messagesContainer.innerHTML += `
                <div class="message received">
                    <div class="message-avatar">🆘</div>
                    <div class="message-content">
                        <div class="message-sender">Support Bot</div>
                        <div class="message-text">
                            Welcome to OmniBazaar Chat! This is a secure, peer-to-peer messaging system. 
                            All messages are encrypted end-to-end.
                        </div>
                        <div class="message-time">10:30 AM</div>
                    </div>
                </div>
            `;
        }
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    sendMessage(event) {
        event.preventDefault();
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            // Add message to chat
            const messagesContainer = document.getElementById('chatMessages');
            const messageHTML = `
                <div class="message sent">
                    <div class="message-avatar">👤</div>
                    <div class="message-content">
                        <div class="message-sender">You</div>
                        <div class="message-text">${this.escapeHtml(message)}</div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            
            // Clear input
            input.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate response
            this.simulateResponse(message);
        }
    }
    
    simulateResponse(userMessage) {
        // Show typing indicator
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'block';
        
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            
            // Add response based on context
            const messagesContainer = document.getElementById('chatMessages');
            let response = "Thanks for your message! In a live system, this would be sent through our P2P network.";
            
            if (userMessage.toLowerCase().includes('price')) {
                response = "The price is firm at $289.99, but I'm open to reasonable offers!";
            } else if (userMessage.toLowerCase().includes('ship')) {
                response = "I ship nationwide with tracking and insurance. Usually takes 3-5 business days.";
            }
            
            const responseHTML = `
                <div class="message received">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-sender">John Doe</div>
                        <div class="message-text">${response}</div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', responseHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1500);
    }
    
    startNewChat() {
        const recipient = prompt('Enter username or address to start a new chat:');
        if (recipient) {
            alert(`Starting encrypted P2P chat with ${recipient}...\n\nIn production, this would:\n- Resolve ENS/username to address\n- Establish P2P connection\n- Exchange encryption keys\n- Open secure channel`);
        }
    }
    
    updateStatus(status) {
        document.getElementById('chatStatus').textContent = status;
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    startMessageSimulation() {
        // Simulate incoming messages periodically
        setInterval(() => {
            if (!this.isOpen) {
                // Update badge count
                const badge = document.getElementById('chatBadge');
                const count = parseInt(badge.textContent || '0') + 1;
                badge.textContent = count;
                badge.style.display = 'block';
            }
        }, 30000); // Every 30 seconds
    }
}

// Initialize chat modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.chatModal = new ChatModal();
    });
} else {
    window.chatModal = new ChatModal();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatModal;
}