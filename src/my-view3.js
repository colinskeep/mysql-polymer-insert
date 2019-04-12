/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import "../../node_modules/@polymer/paper-input/paper-textarea.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";

class MyView3 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        #logo {
          position: absolute;
          right: 0;
          padding-right: 80px;
        }
      </style>

      <div class="card">
        <img id="logo" src="../images/carbeyondstorelogo.jpg"</img>
        <h1>Insert FNSKU Mapping</h1>
        <p>In order for scanz0r to recognize FBA product labels (FNSKU's) we need to tell scanz0r how to associate them with our local skus.</p>
        <p>To insert the FNSKU's to the database, paste the FNSKU and SKU separated by a comma below 1 per line and click submit.</p>
        <paper-textarea id="" label="fnsku, sku" value="{{import}}"></paper-textarea>
        <br><br>
        <paper-button raised on-click="_fire">Submit</paper-button>
      </div>

    `;
  }
  _fire() {
    console.log('attempting to insert MySQL records');
    const arr = this.fbasku.split('\n');
    const url = 'http://192.168.1.106:9000/fnsku';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({values: arr}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(function(data) {
        console.log(data);
      })
    }).catch(err => {
      console.log(err);
    });
    this.fbasku = '';
  }
}

window.customElements.define('my-view3', MyView3);
