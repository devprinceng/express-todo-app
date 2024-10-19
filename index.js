const app = require("./app");
const { port } = require("./init/keys");

//listen on our server
app.listen(port, () => console.log(`Server running on PORT ${port}`));
