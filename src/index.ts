export interface Res {
  time: number;
  MutationRecords: MutationRecord[];
}
export class Mtimer {
  targetNode: Element;
  observer: MutationObserver;
  Records: [number, MutationRecord[]][];
  Listeners: (() => boolean)[];
  Listener: () => void;
  constructor(targetNode: Element) {
    this.targetNode = targetNode;
    this.Listeners = [];
    this.Records = [];
  }
  Activate() {
    this.observer = new MutationObserver((mutationList, observer) => {
      this.Records.push([Date.now(), mutationList]);
      this.Listener && this.Listener();
    });
    this.observer.observe(this.targetNode, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  Deactivate() {
    this.observer.disconnect();
    this.observer = null;
  }
  Clean() {
    this.Records = [];
  }
  Start(then: (res: Res[]) => void, timeout: number, name?: string) {
    if (!this.observer) {
      return;
    }
    console.log("testing...");
    let oLen = this.Records.length;
    let lastLen = oLen;
    let time = Date.now();
    let cb = () => {
      if (this.Records.length > lastLen) {
        lastLen = this.Records.length;
        setTimeout(cb, timeout);
      } else {
        let r = this.Records.slice(oLen, this.Records.length);
        let res: Res[] = [];
        r.forEach((item) => {
          res.push({ time: item[0] - time, MutationRecords: item[1] });
        });
        then(res);
      }
    };
    this.Listener = () => {
      setTimeout(cb, timeout);
      this.Listener = undefined;
    };
  }
}
