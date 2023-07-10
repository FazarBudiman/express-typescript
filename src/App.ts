import express, { Application} from "express"
import cors from "cors"

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
  }

  protected plugins(): void {
    this.app.use(cors())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default App;