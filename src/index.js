const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public'); // Adjusted path for serving static files

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(publicPath)); // Serve static files from the 'public' directory

app.get("/", (req, res) => {
    res.render("login", (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering login view');
        } else {
            res.send(html);
        }
    });
});

app.get("/signup", (req, res) => {
    res.render("signup", (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering signup view');
        } else {
            res.send(html);
        }
    });
});

app.get("/login", (req, res) => {
    res.render("login", (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering login view');
        } else {
            res.send(html);
        }
    });
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });

        if (user && user.password === req.body.password) {
            res.render("home", (err, html) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error rendering home view');
                } else {
                    res.send(html);
                }
            });
        } else {
            res.send("Wrong password or username");
        }
    } catch (err) {
        console.error(err);
        res.send("An error occurred while logging in");
    }
});

app.post("/signup", async (req, res) => {
    try {
        const user = new collection({
            name: req.body.name,
            password: req.body.password
        });

        await user.save();
        res.render("home", (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error rendering home view');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user to the database');
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});