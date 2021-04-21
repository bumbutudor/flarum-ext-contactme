/*
 *  Contact Us Extension for Flarum
 *  Author: Marco Colia
 *  Website: https://flarum.it
 *
 *  Special Thanks to Askvortsov
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:

 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import Page from "flarum/components/Page";
import IndexPage from "flarum/components/IndexPage";
import listItems from "flarum/helpers/listItems";
import Stream from "flarum/common/utils/Stream";
import Button from "flarum/common/components/Button";

export default class ContactPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = false;
    this.message = Stream("");
    this.sent = false;
  }
  form() {
    if (!app.session.user) {
      return m(
        "h1",
        {
          class: "warningbox",
        },
        app.translator.trans("flarum-ext-contactme.forum.notloggedin")
      )
    }
    if (this.sent) {
      return m("div", {"class":"img-container"},
        m("img", {"src":"https://i.ibb.co/G3w1J0x/sent-successfully-ok.png"})
      );
    }
    return m("form.Form-group", { onsubmit: this.submit.bind(this) }, [
      m("textarea.message1", {
        required: true,
        bidi: this.message,
        placeholder: app.translator.trans(
          "flarum-ext-contactme.forum.textAreaField"
        ),
      }),
      m("div", {"class":"buttonHolder"},
        m(
          Button,
          { type: "submit", loading: this.loading, className: "Button" },
          app.translator.trans("flarum-ext-contactme.forum.sendForm")
        )),
    ]);
  }
  view() {
    return m(".IndexPage", [
      IndexPage.prototype.hero(),
      m(
        ".container",
        m(".sideNavContainer", [
          m(
            "nav.IndexPage-nav.sideNav",
            m("ul", listItems(IndexPage.prototype.sidebarItems().toArray()))
          ),
          m(
            ".IndexPage-results.sideNavOffset",
            m(
              "h1",
              {
                class: "titolo1",
              },
              app.translator.trans("flarum-ext-contactme.forum.pageTitle")
            ),
            m(
              "p",
              {
                class: "banner-message",
              },
              app.translator.trans("flarum-ext-contactme.forum.pText")
            ),
            this.form()
          ),
        ])
      ),
    ]);
  }
  submit(e) {
    e.preventDefault();
    this.loading = true;
    m.redraw();
    app
      .request({
        method: "POST",
        url: app.forum.attribute("baseUrl") + "/sendmail",
        body: { message: this.message() },
      })
      .then(() => {
        this.loading = false;
        this.sent = true;
        m.redraw();
      });
  }
}
