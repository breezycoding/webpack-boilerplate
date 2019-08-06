import {library, dom} from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import "./index.css";
import "./index.scss";
import { catImage } from "./components/addImage";

library.add(faSpinner, faUser, faAccessibleIcon);
dom.watch();

catImage();

