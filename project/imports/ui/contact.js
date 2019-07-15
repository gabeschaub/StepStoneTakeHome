import { Template } from 'meteor/templating';

import { Contacts } from '../api/contacts.js';

import './contact.html';

Template.contact.events({
    'click .edit-button'() {
        // Set the checked property to the opposite of its current value
        let editModal = document.getElementById('edit-modal-' + this._id);
        editModal.showModal();
        let form = document.getElementById('edit-' + this._id);

        form.elements["first"].value = this.first;
        form.elements["last"].value = this.last;
        form.elements["phone"].value = this.phone;
        form.elements["email"].value = this.email;

    },

    'submit .update-contact'(event) {
        console.log(this);
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;

        const first = target.elements["first"].value;
        const last = target.elements["last"].value;
        const phone = target.elements["phone"].value;
        const email = target.elements["email"].value;

        console.log(this);

        // Update contact in the collection
        Contacts.update(this._id, {
            $set: {
                first: first,
                last: last,
                phone: phone,
                email: email
            },
        });

        // Clear form
        target.elements["first"].value = '';
        target.elements["last"].value = '';
        target.elements["phone"].value = '';
        target.elements["email"].value = '';
        //close modal
        document.getElementById('edit-modal-' + this._id).close();

    },

    'click .delete'() {
        Contacts.remove(this._id);
    },


    'click '(event) {
        console.log('clicked');
        let editModal = document.getElementById('edit-modal-' + this._id);

        if (event.target == editModal) {

            //close modal
            editModal.close();
        }

    }

});


