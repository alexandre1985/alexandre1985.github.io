document.addEventListener('DOMContentLoaded', function() {
    
    converse.initialize({

        bosh_service_url: 'https://niel.site/http-bind/',
        allow_logout: false,
        auto_list_rooms: false,
        auto_subscribe: false,
        message_carbons: false,
        message_archiving: 'never',
        domain_placeholder: ' e.g. niel.site',
        providers_link: 'https://niel.site',
        keepalive: true,
        allow_registration: false,
        show_send_button: true,
        registration_domain: 'https://niel.site/register.php',
        show_message_load_animation: true,
        clear_messages_on_reconnection: true,
        synchronize_availability: false,
        use_system_emojis: true,

        allow_contact_removal: false,
        allow_contact_requests: false,

        blacklisted_plugins: ['converse-profile']
        
    });

});
