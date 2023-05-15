import { Engage } from "@xipjs/xip";
import Counter from "./counter";

Engage(Counter, (e) => document.body.replaceChildren(e));
