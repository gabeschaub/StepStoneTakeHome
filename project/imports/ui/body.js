import {Template} from 'meteor/templating';
import {Contacts} from '../api/contacts.js';
import './contact.js';
import './body.html';


Template.body.helpers({
    contacts() {
        return Contacts.find({}, {sort: {first: 1}});
    }
});

Template.body.events({

    'submit .new-contact'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;

        const first = target.elements["first"].value;
        const last = target.elements["last"].value;
        const phone = target.elements["phone"].value;
        const email = target.elements["email"].value;

        // Insert a contact into the collection
        Contacts.insert({
            first,
            last,
            phone,
            email,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.elements["first"].value = '';
        target.elements["last"].value = '';
        target.elements["phone"].value = '';
        target.elements["email"].value = '';

    },
});



