
import { getTipoDocs } from "./../controllers/tipodocs.controller";
import express, { response } from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import {
  getClients,
  postClient,
  deleteClient,
  getClientById,
} from "../controllers/client.controller";
import {
  addPhoto, getLastUserAdded
} from "../controllers/user.contoller";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.route("/clients").get((req, res) => {
  getClients().then((r: any) => {
    res.json(r[0]);
  });
});

router.route("/clients/:id").get((req, res) => {
  getClientById(req.params.id).then((r: any) => {
    res.json(r[0]);
  });
});

router.route("/clients").post((req, res) => {
  postClient(req.body)
    .then((r: any) => {
      res.json("Cliente insertado");
    })
    .catch((e: any) => {
      res.json({ code: e.code, message: e.message });
    });
});

router.route("/clients/:id").delete((req, res) => {
  deleteClient(req.params.id).then((r: any) => {
    res.json("Cliente Eliminado");
  });
});

router.route("/tipodocs").get((req, res) => {
  getTipoDocs().then((r: any) => {
    res.json(r[0]);
  });
});

router.route("/users/addphoto").post((req, res) => {
  addPhoto(req.body)
    .then((r: any) => {
      res.json("Foto Cambiada");
    })
    .catch((e: any) => {
      res.json({ code: e.code, message: e.message });
    });
});

router.route("/users/getlastuseradded").get((req, res) => {
  getLastUserAdded().then((r: any) => {
    res.json(r[0]);
  });
});


app.listen(3001, () => console.log("Server on port 3001"));
