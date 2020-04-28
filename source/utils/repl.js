import { readFileSync } from "fs";

class ConsList {
    constructor(x, y) {
        this._car = x;
        this._cdr = y;
    }

    get car() {
        return this._car;
    }

    get cdr() {
        return this._cdr;
    }
}

const cons = (x, y) => new ConsList(x, y);
const car = l => l.car;
const cdr = l => l.cdr;
const isConsList = x => x instanceof ConsList;

const nil = cons(null, null);
const isNull = x => car(x) === null && cdr(x) === null;

const BO = {
    ADD: "ADD",
    SUB: "SUB",
    MUL: "MUL",
    DIV: "DIV",
    MOD: "MOD",
    SCONCAT: "SCONCAT",
};

const BP = {
    GT: "GT",
    GTE: "GTE",
    LT: "LT",
    LTE: "LTE",
    EQ: "EQ",
    NOEQ: "NOEQ",
};

const SF = {
    DEF: "DEF",
    SET: "SET",
    GET: "GET",
    QUOTE: "QUOTE",
    TYPEOF: "TYPEOF",
    CONS: "CONS",
    CAR: "CAR",
    CDR: "CDR",
    COND: "COND",
    PRINT: "PRINT",
    READ: "READ",
    EVAL: "EVAL",
    EVALIN: "EVALIN",
    LAMBDA: "LAMBDA",
    MACRO: "MACRO",
    MACROEXPAND: "MACROEXPAND",
};

const keywords = {
    "+": BO.ADD,
    "-": BO.SUB,
    "*": BO.MUL,
    "/": BO.DIV,
    "%": BO.MOD,
    "++": BO.SCONCAT,
    ">": BP.GT,
    ">=": BP.GTE,
    "<": BP.LT,
    "<=": BP.LTE,
    "=": BP.EQ,
    "!=": BP.NOEQ,
    def: SF.DEF,
    "set!": SF.SET,
    get: SF.GET,
    quote: SF.QUOTE,
    typeof: SF.TYPEOF,
    cons: SF.CONS,
    car: SF.CAR,
    cdr: SF.CDR,
    cond: SF.COND,
    print: SF.PRINT,
    read: SF.READ,
    eval: SF.EVAL,
    "eval-in": SF.EVALIN,
    lambda: SF.LAMBDA,
    macro: SF.MACRO,
    macroexpand: SF.MACROEXPAND,
};

const keywordsReversed = Object.keys(keywords).reduce((acc, key) => {
    const val = keywords[key];
    acc[val] = key;
    return acc;
}, {});

class Symbol {
    constructor(s) {
        this._value = s;
    }

    get value() {
        return this._value;
    }
}
const isSymbol = x => x instanceof Symbol;
const symbolOK = new Symbol("OK");

class Env {
    constructor(m, p) {
        this._frame = m;
        this._parent = p;
    }

    get parent() {
        return this._parent;
    }

    get frame() {
        return this._frame;
    }

    setVar(k, v) {
        let e = this;
        while (e !== null) {
            if (k in e.frame) {
                e.frame[k] = v;
                break;
            }
            e = e.parent;
        }
    }

    getVar(k, s) {
        let e = this;
        while (e !== null) {
            if (k in e.frame) {
                return e.frame[k];
            }
            e = e.parent;
        }
        return isSymbol(s) ? s : new Symbol(k);
    }

    defVar(k, v) {
        this._frame[k] = v;
    }
}

const globalEnv = new Env({}, null);

class Lambda {
    constructor(args, body, env) {
        this._args = args;
        this._body = body;
        this._env = env;
    }

    get args() {
        return this._args;
    }

    get body() {
        return this._body;
    }

    get env() {
        return this._env;
    }
}

const isLambda = x => x instanceof Lambda;

class Macro {
    constructor(args, body) {
        this._args = args;
        this._body = body;
    }

    get args() {
        return this._args;
    }

    get body() {
        return this._body;
    }
}

const isMacro = x => x instanceof Macro;

const parse = s => {
    const [x, ss] = prs(s);
    if (!ss.trim()) {
        return x;
    }

    const [y, zz] = prs(`(${ss})`);
    if (!zz.trim()) {
        return cons(x, y);
    }

    throw new Error(`extra symbols: ${zz}`);
};

const prs = s => {
    s = s.trimLeft();
    if (!s) {
        return [nil, ""];
    }

    const c = s[0];
    const z = s.slice(1);

    if (c === "(") {
        return prsList(z);
    }

    if (c === ")") {
        throw new Error(`extra closed ')': ${s}`);
    }

    if (c === '"') {
        const idx = z.indexOf('"');
        if (idx < 0) {
            throw new Error(`closed '"' is missed: ${s}`);
        }
        return [z.slice(0, idx), z.slice(idx + 1)];
    }

    if (c === ";") {
        const idx = z.indexOf(";");
        if (idx < 0) {
            throw new Error(`closed ';' is missed: ${s}`);
        }
        return prs(z.slice(idx + 1));
    }

    if (c === "'") {
        const [x, ss] = prs(z);
        return [cons(SF.QUOTE, cons(x, nil)), ss];
    }

    const regexp = /\s|\(|\)|"|;|$/;
    const idx = s.search(regexp);
    return [prsVal(s.slice(0, idx)), s.slice(idx)];
};

const prsList = s => {
    s = s.trimLeft();
    if (!s) {
        throw new Error(`closed ')' is missed: ${s}`);
    }
    if (s[0] === ")") {
        return [nil, s.slice(1)];
    }

    const [x, ss] = prs(s);
    const [t, zz] = prsList(ss);
    return [cons(x, t), zz];
};

const prsVal = s => {
    if (s === "true") {
        return true;
    }

    if (s === "false") {
        return false;
    }

    if (keywords[s]) {
        return keywords[s];
    }

    const res = Number(s);
    if (!Number.isNaN(res)) {
        return res;
    }

    return new Symbol(s);
};

const evalLisp = input => {
    const s = input.trim();
    let o;
    let r;
    try {
        o = parse(s);
        try {
            r = evalRec(o, globalEnv);
            return show(r);
        } catch (err) {
            throw new Error(`Eval error: ${err.message}`);
        }
    } catch (err) {
        throw new Error(`Parsing error: ${err.message}`);
    }
};

const show = o => {
    if (isConsList(o)) {
        let res = "";
        while (!isNull(o)) {
            res = `${res} ${show(car(o))}`;
            o = cdr(o);
        }
        return `(${res.trimLeft()})`;
    }

    if (keywordsReversed[o]) {
        return keywordsReversed[o];
    }

    if (isSymbol(o)) {
        return o.value;
    }

    if (typeof o === "boolean") {
        return o;
    }

    if (isLambda(o)) {
        return `(lambda ${show(o.args)} ${show(o.body)})`;
    }

    if (isMacro(o)) {
        return `(macro ${show(o.args)} ${show(o.body)})`;
    }

    if (typeof o === "string") {
        return `"${o}"`;
    }

    return "" + o;
};

const evalRec = (o, e) => {
    if (isSymbol(o)) {
        return e.getVar(o.value, o);
    }

    if (isConsList(o)) {
        if (isNull(o)) {
            return o;
        }

        let t = cdr(o);
        const h = evalRec(car(o), e);

        if (BO[h]) {
            return foldBo(h, t, e);
        } else if (BP[h]) {
            return foldBp(h, t, e);
        } else if (SF[h]) {
            if (h === SF.DEF || h === SF.SET) {
                while (!isNull(t) && !isNull(cdr(t))) {
                    const s = objectEvalToSymbolName(car(t), e);
                    const v = evalRec(car(cdr(t)), e);
                    if (h === SF.DEF) {
                        e.defVar(s, v);
                    } else {
                        e.setVar(s, v);
                    }
                    t = cdr(cdr(t));
                }
                return symbolOK;
            }

            if (h === SF.GET) {
                const s = car(t);
                return e.getVar(objectEvalToSymbolName(s, e), s);
            }

            if (h === SF.QUOTE) {
                return car(t);
            }

            if (h === SF.TYPEOF) {
                return getTypeName(evalRec(car(t), e));
            }

            if (h === SF.CONS) {
                const m = evalListToArray(t, e);
                let v = nil;
                let lst = true;
                for (const x of m.reverse()) {
                    v = lst && isConsList(x) ? x : cons(x, v);
                    lst = false;
                }
                return v;
            }

            if (h === SF.CAR) {
                const a = evalRec(car(t), e);
                return isConsList(a) ? car(a) : a;
            }

            if (h === SF.CDR) {
                const a = evalRec(car(t), e);
                return isConsList(a) ? cdr(a) : nil;
            }

            if (h === SF.COND) {
                while (!isNull(t) && !isNull(cdr(t))) {
                    if (evalRec(car(t), e)) {
                        return evalRec(car(cdr(t)), e);
                    }
                    t = cdr(cdr(t));
                }
                return isNull(t) ? nil : evalRec(car(t), e);
            }

            if (h === SF.PRINT || h === SF.READ) {
                const m = evalListToArray(t, e);
                let s = "";
                for (const x of m) {
                    s += typeof x === "string" ? x : show(x);
                }
                console.log(s);
                return symbolOK;
            }

            if (h === SF.EVAL) {
                return evalRec(evalRec(car(t), e), e);
            }

            if (h === SF.LAMBDA) {
                return new Lambda(car(t), getBody(cdr(t)), e);
            }

            if (h === SF.MACRO) {
                return new Macro(car(t), getBody(cdr(t)));
            }

            if (h === SF.MACROEXPAND) {
                const a = evalRec(car(t), e);
                if (isMacro(a)) {
                    return macroexpand(a, cdr(t), e);
                }
                return null;
            }

            throw new Error(`Unrecognized special form: ${h}`);
        } else if (isLambda(h)) {
            return evalRec(
                h.body,
                new Env(getMapNamesValues(h.args, t, e, true), h.env),
            );
        } else if (isMacro(h)) {
            return evalRec(macroexpand(h, t, e), e);
        }

        let v = h;
        while (!isNull(t)) {
            v = evalRec(car(t), e);
            t = cdr(t);
        }
        return v;
    } else {
        return o;
    }
};

const foldBo = (op, t, e) => {
    if (isNull(t)) {
        throw new Error(`no operands for arithmetic operation: ${op}`);
    }
    let r = evalRec(car(t), e);
    t = cdr(t);
    while (!isNull(t)) {
        r = bo(op, r, evalRec(car(t), e));
        t = cdr(t);
    }
    return r;
};

const bo = (op, a, b) => {
    if (op === BO.ADD) {
        return a + b;
    }

    if (op === BO.SUB) {
        return a - b;
    }

    if (op === BO.MUL) {
        return a * b;
    }

    if (op === BO.DIV) {
        return a / b;
    }

    if (op === BO.MOD) {
        return a % b;
    }

    if (op === BO.SCONCAT) {
        a = typeof a === "string" ? a : show(a);
        b = typeof b === "string" ? b : show(b);
        return a + b;
    }

    return null;
};

const foldBp = (op, t, e) => {
    if (isNull(t)) {
        return true;
    }

    let a = evalRec(car(t), e);
    t = cdr(t);

    while (!isNull(t)) {
        const b = evalRec(car(t), e);
        if (!bp(op, a, b)) {
            return false;
        }
        a = b;
        t = cdr(t);
    }

    return true;
};

const bp = (op, a, b) => {
    if (op === BP.GT) {
        return a > b;
    }

    if (op === BP.GTE) {
        return a >= b;
    }

    if (op === BP.LT) {
        return a < b;
    }

    if (op === BP.LTE) {
        return a <= b;
    }

    if (op === BP.EQ) {
        return areObjectsEqual(a, b);
    }

    if (op === BP.NOEQ) {
        return !areObjectsEqual(a, b);
    }

    return null;
};

const areObjectsEqual = (x, y) => {
    if (typeof x === "number" && typeof y === "number") {
        return x === y;
    }

    if (typeof x !== typeof y) {
        return false;
    }

    if (isSymbol(x)) {
        return x.value === y.value;
    }

    if (isConsList(x)) {
        while (!isNull(x) && !isNull(y)) {
            if (!areObjectsEqual(car(x), car(y))) {
                return false;
            }
            x = cdr(x);
            y = cdr(y);
        }
        return isNull(x) && isNull(y);
    }

    return x === y;
};

const getTypeName = o => {
    if (isConsList(o)) {
        return "ConsList";
    }

    if (isLambda(o)) {
        return "Lambda";
    }

    return typeof o;
};

const evalListToArray = (t, e) => {
    const m = [];
    while (!isNull(t)) {
        m.push(evalRec(car(t), e));
        t = cdr(t);
    }
    return m;
};

const objectEvalToSymbolName = (o, e) => {
    if (isSymbol(o)) {
        return o.value;
    }

    if (typeof o === "string") {
        return o;
    }

    const s = show(evalRec(o, e));
    if (s[0] === '"' && s[s.length - 1] === '"') {
        return s.slice(1, -1);
    }
    return s;
};

const getBody = o => {
    if (isConsList(o) && !isNull(o) && isNull(cdr(o))) {
        return car(o);
    }

    return o;
};

const getMapNamesValues = (ns, bs, e, evalFlag) => {
    const r = {};

    while (!isNull(ns) && !isNull(bs)) {
        let v;
        let m;

        if (isNull(cdr(ns)) && !isNull(cdr(bs))) {
            if (evalFlag) {
                m = evalListToArray(bs, e);
                v = nil;
                for (const x of m.reverse()) {
                    v = cons(x, v);
                }
            } else {
                v = bs;
            }
        } else if (evalFlag) {
            v = evalRec(car(bs), e);
        } else {
            v = car(bs);
        }

        r[car(ns).value] = v;
        ns = cdr(ns);
        bs = cdr(bs);
    }

    return r;
};

const macroexpand = (m, t, e) => {
    return macroSubst(m.body, getMapNamesValues(m.args, t, e, false));
};

const macroSubst = (body, kv) => {
    if (isSymbol(body)) {
        return kv[body.value] || body;
    }

    if (isConsList(body)) {
        if (isNull(body)) {
            return nil;
        }

        return cons(macroSubst(car(body), kv), macroSubst(cdr(body), kv));
    }

    return body;
};

const loadFile = filename => {
    try {
        const s = readFileSync(filename, { encoding: "utf-8" });
        if (!s) {
            throw new Error("empty file");
        }
        evalLisp(s);
    } catch (err) {
        console.log(`File error: ${err.message}`);
    }
};

export { evalLisp, loadFile };