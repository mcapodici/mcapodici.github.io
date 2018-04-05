
                var node = document.getElementById('main');
                var app = Elm.Main.embed(node);

                app.ports.storeSessionRaw.subscribe(function (session) {
                        localStorage.session = session;
                });

                app.ports.onUserChangeRaw.send(localStorage.session);

                window.addEventListener("storage", function (event) {
                        if (event.storageArea === localStorage && event.key === "session") {
                                app.ports.onUserChangeRaw.send(event.newValue);
                        }
                }, false);