// Create a class based on HTMLElement
class HelloElement extends HTMLElement {
    // Declare attributes observed by browser
    static get observedAttributes() {
        return ['who'];
    }

    strong;

    constructor() {
        super();

        // Creates the shadow root
        let shadowRoot = this.attachShadow({mode: 'open'});

        // Gets content from <template>
        const currentDocument = document.currentScript.ownerDocument;
        const template: HTMLTemplateElement = currentDocument.querySelector('#hello-element-tpl');

        // Adds a template clone into shadow root
        const clone = template.content.cloneNode(true);
        shadowRoot.appendChild(clone);

        // Caches <strong> DOM query
        this.strong = shadowRoot.querySelector('strong');

        // Set a default value to the "who" property
        this.who = 'World';
    }

    connectedCallback() {
        this._upgradeProperty('who');
    }

    _upgradeProperty(prop: string) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    // Invoked when attributes declared as observed have changed
    // Fires when an attribute was added, removed, or updated
    attributeChangedCallback(attrName: string, oldVal, newVal) {
        if (attrName === 'who') {
            if (newVal !== oldVal) {
                this.who = newVal;
            }
        }
    }

    get who() {
        return this.getAttribute('who');
    }

    // Sets new value to "who" attribute
    set who(val) {
        this.setAttribute('who', val || '');
        // Sets "who" value into <strong>
        this.strong.textContent = val || '';
    }
}

// Registers <hello-world> in the main document
customElements.define('hello-element', HelloElement);