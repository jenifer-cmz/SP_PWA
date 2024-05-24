// ***********************************************************
//                      CODED BY                             *
//                  TEAM JEN.AUR.IMA.JUL                     *
//       AKA : JENIFER - AURÉLIE - IMADE - JULIEN            *
//    LPDWCA 23-24 - U.E 6.3 - PROGRESSIVE WEB APPLICATION   *
// ***********************************************************


document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const sendButton = document.getElementById('send');
    const messageInput = document.getElementById('message');

    // Charger les messages depuis localStorage
    const loadMessages = () => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.innerHTML = '';
        storedMessages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = msg;
            messages.appendChild(messageElement);
        });
    };

    // Sauvegarder le message dans localStorage
    const saveMessage = (msg) => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        storedMessages.push(msg);
        localStorage.setItem('messages', JSON.stringify(storedMessages));
    };

    // Fonction pour envoyer un message
    const sendMessage = () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = messageText;
            messages.appendChild(messageElement);
            saveMessage(messageText);
            messageInput.value = '';
            notifyUser(messageText);
        }
    };

    // Gestion de l'événement clic du bouton d'envoi
    sendButton.addEventListener('click', sendMessage);

    // Gestion de la touche entrée
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    });

    // Notification push
    const notifyUser = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('New message', {
                body: message,
                icon: 'appicon.png'
            });
        } else {
            console.log('Notification permission non autorisée');
        }
    };

    // Demander la permission de notification
    const requestNotificationPermission = () => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission autorisée.');
                } else {
                    console.log('Notification permission non autorisée.');
                }
            }).catch(err => {
                console.error('Notification demande de permission refusée', err);
            });
        }
    };

    requestNotificationPermission();

    // Effacer le localStorage après rafraîchissement de la page
    window.addEventListener('beforeunload', (event) => {
        const confirmationMessage = 'Voulez-vous vraiment quitter cette page et effacer l\'historique des messages ?';
        (event || window.event).returnValue = confirmationMessage; // compatibilité avec tous les navigateurs
        return confirmationMessage; 
    });

    // Effacer le localStorage si la page est déchargée
    window.addEventListener('unload', () => {
        localStorage.clear();
    });

    loadMessages();

    // Enregistrer le Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker non enregistré:', error);
            });
    }
});

