"use strict";

const IMPERIAL = "imperial";
const METRIC = "metric";

class ImperialMetric {
    constructor(val) {
        this.val = val;
        this.map = {
            inch: {
                belong: IMPERIAL,
                toMain: 1,
                toOthers: (2.54 / 100),
            },
            foot: {
                belong: IMPERIAL,
                toMain: 12,
                toOthers: (2.54 / 100),
            },
            m: {
                belong: METRIC,
                toMain: 1,
                toOthers: (1 / 2.54) * 100,
            },
            cm: {
                belong: METRIC,
                toMain: 1 / 100,
                toOthers: (1 / 2.54) * 100,
            },
            mm: {
                belong: METRIC,
                toMain: 1 / 1000,
                toOthers: (1 / 2.54) * 100,
            },
            km: {
                belong: METRIC,
                toMain: 1000,
                toOthers: (1 / 2.54) * 100,
            },
            "sqrt-foot": {
                belong: IMPERIAL,
                toMain: 144,
                toOthers: (6.4516 / 10000),
            },
            "sqrt-inch": {
                belong: IMPERIAL,
                toMain: 1,
                toOthers: (6.4516 / 10000),
            },
            "sqrt-m": {
                belong: METRIC,
                toMain: 1,
                toOthers: (1 / 6.4516) * 10000,
            },
            "sqrt-cm": {
                belong: METRIC,
                toMain: 1 / 10000,
                toOthers: (1 / 6.4516) * 10000,
            },
            "sqrt-mm": {
                belong: METRIC,
                toMain: 1 / 1000000,
                toOthers: (1 / 6.4516) * 10000,
            },
            "sqrt-km": {
                belong: METRIC,
                toMain: 1000000,
                toOthers: (1 / 6.4516) * 10000,
            },
        };
    }

    /**
     *"inch", "cm", "m", "foot", "sqrt-m", "sqrt-km", "sqrt-cm", "sqrt-mm", "sqrt-inch", "sqrt-foot"
     */
    from(unit) {
        this.unit = this.map[unit];
        return this;
    }

    to(goal) {
        this.goal = this.map[goal];
        if (this.unit.belong !== this.goal.belong) {
            return this.val * this.unit.toMain * this.unit.toOthers / this.goal.toMain;
        } else {
            return this.val * this.unit.toMain / this.goal.toMain;
        }
    }
}

export default value => new ImperialMetric(value);