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

import app from "flarum/app";

app.initializers.add("tudor-article-request", () => {
  app.extensionData.for("tudor-article-request")
    .registerSetting(
      {
        setting: "tudor-article-request.coordinates",
        name: "emailSettings",
        type: "email",
        required: true,
        label: app.translator.trans(
          "article-request.admin.settings.emaillabel"
        ),
      },
      15
    )
    .registerSetting(function () {
      return m('.Form-group', [
          m('label', app.translator.trans('article-request.admin.settings.description_label')),
          m('textarea.FormControl', {
              placeholder: app.translator.trans('article-request.admin.settings.description_placeholder'),
              bidi: this.setting("tudor-article-request.article_request_text", ''),
          }),
      ])
    })
});
