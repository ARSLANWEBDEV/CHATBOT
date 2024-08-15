document.addEventListener('DOMContentLoaded', () => {
    const messagingPanel = document.getElementById('messagingPanel');
    const closeBtn = document.querySelector('.close-btn');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sendBtn = document.querySelector('.send-btn');
    const newMessageInput = document.querySelector('.new-message-input');
    const messagesList = document.querySelector('.messages-list');
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.querySelector('.filter-options');
    const messageDetailsTab = document.querySelector('.message-details-tab');
    const messageDetailsContent = document.querySelector('.message-details-content');
    const closeDetailsBtn = document.querySelector('.close-details-btn');

    let currentMessageElement = null; // To keep track of the message being viewed

    // Sample message
    const sampleMessage = {
        name: "ARSLAN AKIF",
        preview: "ASSALAM U ALAIKUM this is all i could do today",
        timestamp: "12:50 PM",
        details: "This is a more detailed view of the message. Here you can see more information, and the full content of the message."
    };

    // Function to create a message element
    const createMessageElement = (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');

        const messageInfo = document.createElement('div');
        messageInfo.classList.add('message-info');

        const name = document.createElement('h4');
        name.classList.add('name');
        name.textContent = message.name;

        const preview = document.createElement('p');
        preview.classList.add('preview');
        preview.textContent = message.preview;

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = message.timestamp;

        // Create the three-dot button
        const optionsBtn = document.createElement('button');
        optionsBtn.classList.add('options-btn');
        optionsBtn.innerHTML = '&#8226;&#8226;&#8226;'; // Unicode for three dots

        // Create the options dropdown
        const optionsDropdown = document.createElement('div');
        optionsDropdown.classList.add('options-dropdown');

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('option');
        deleteOption.textContent = 'Delete';
        deleteOption.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteMessage(messageElement);
        });

        const archiveOption = document.createElement('button');
        archiveOption.classList.add('option');
        archiveOption.textContent = 'Archive';
        archiveOption.addEventListener('click', (e) => {
            e.stopPropagation();
            archiveMessage(messageElement);
        });

        const starOption = document.createElement('button');
        starOption.classList.add('option');
        starOption.textContent = 'Star';
        starOption.addEventListener('click', (e) => {
            e.stopPropagation();
            starMessage(messageElement);
        });

        const unreadOption = document.createElement('button');
        unreadOption.classList.add('option');
        unreadOption.textContent = 'Mark as Unread';
        unreadOption.addEventListener('click', (e) => {
            e.stopPropagation();
            markAsUnread(messageElement);
        });

        optionsDropdown.appendChild(deleteOption);
        optionsDropdown.appendChild(archiveOption);
        optionsDropdown.appendChild(starOption);
        optionsDropdown.appendChild(unreadOption);

        // Append the dropdown to the options button
        optionsBtn.appendChild(optionsDropdown);

        // Add event listener to toggle options dropdown
        optionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            optionsDropdown.style.display = optionsDropdown.style.display === 'block' ? 'none' : 'block';
        });

        messageInfo.appendChild(name);
        messageInfo.appendChild(preview);

        messageElement.appendChild(avatar);
        messageElement.appendChild(messageInfo);
        messageElement.appendChild(timestamp);
        messageElement.appendChild(optionsBtn);

        // Add click event to open message details
        messageElement.addEventListener('click', () => {
            openMessageDetails(message, messageElement);
        });

        return messageElement;
    };

    // Function to delete the current message
    const deleteMessage = (messageElement) => {
        messageElement.remove(); // Remove the message from the list
    };

    // Function to archive the current message
    const archiveMessage = (messageElement) => {
        // Placeholder for archive functionality
        alert('Message archived!');
        messageElement.remove(); // Optionally remove the message
    };

    // Function to star the current message
    const starMessage = (messageElement) => {
        // Placeholder for star functionality
        alert('Message starred!');
    };

    // Function to mark the current message as unread
    const markAsUnread = (messageElement) => {
        // Placeholder for mark as unread functionality
        alert('Message marked as unread!');
    };

    // Function to open message details tab
    const openMessageDetails = (message, messageElement) => {
        currentMessageElement = messageElement; // Store the message element being viewed
        messageDetailsContent.innerHTML = `
            <button class="close-details-btn">&times;</button>
            <h3>${message.name}</h3>
            <p>${message.details}</p>
            <p><strong>Time:</strong> ${message.timestamp}</p>
            <button class="delete-btn">Delete</button>
        `;
        messageDetailsTab.classList.add('open');

        // Add delete functionality
        const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteMessage(currentMessageElement);
            messageDetailsTab.classList.remove('open'); // Close the details tab
        });
    };

    // Function to close message details tab
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-details-btn')) {
            messageDetailsTab.classList.remove('open');
        }
    });

    // Append sample message on load
    messagesList.appendChild(createMessageElement(sampleMessage));

    closeBtn.addEventListener('click', () => {
        messagingPanel.style.display = 'none';
    });

    minimizeBtn.addEventListener('click', () => {
        messagingPanel.classList.toggle('minimized');
        minimizeBtn.innerHTML = messagingPanel.classList.contains('minimized') ? '&#9650;' : '&#9660;';
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    sendBtn.addEventListener('click', () => {
        const messageText = newMessageInput.value.trim();
        if (messageText) {
            const newMessage = {
                name: "You",
                preview: messageText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                details: messageText // Use the same text as details for simplicity
            };
            messagesList.appendChild(createMessageElement(newMessage));
            newMessageInput.value = '';
            messagesList.scrollTop = messagesList.scrollHeight;  // Scroll to bottom
        }
    });

    filterBtn.addEventListener('click', () => {
        filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
            filterOptions.style.display = 'none';
        }
    });
});
