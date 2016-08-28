const daysInAMonth = 29.53059

function getFraction(fr) {
	return fr - Math.floor(fr)
}

Date.prototype.getJulian = function() {
    return (this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5
}

export default function(today) {
    const julianDate = today.getJulian()
    const year = today.getFullYear()
    const degToRad = 3.14159265 / 180
    const K0 = Math.floor((year - 1900) * 12.3685)
    const T = (year - 1899.5) / 100
    const T2 = T * T
    const T3 = T * T * T
    const J0 = 2415020 + 29 * K0
    const F0 = 0.0001178 * T2 - 0.000000155 * T3 + (0.75933 + 0.53058868 * K0) - (0.000837 * T + 0.000335 * T2)
    const M0 = 360 * (getFraction(K0 * 0.08084821133)) + 359.2242 - 0.0000333 * T2 - 0.00000347 * T3
    const M1 = 360 * (getFraction(K0 * 0.07171366128)) + 306.0253 + 0.0107306 * T2 + 0.00001236 * T3
    const B1 = 360 * (getFraction(K0 * 0.08519585128)) + 21.2964 - (0.0016528 * T2) - (0.00000239 * T3)
    let phase = 0
    let julianDay = 0
		let oldJ = julianDay
    while (julianDay < julianDate) {
        let F = F0 + 1.530588 * phase
        const M5 = (M0 + phase * 29.10535608) * degToRad
        const M6 = (M1 + phase * 385.81691806) * degToRad
        const B6 = (B1 + phase * 390.67050646) * degToRad
        F -= 0.4068 * Math.sin(M6) + (0.1734 - 0.000393 * T) * Math.sin(M5)
        F += 0.0161 * Math.sin(2 * M6) + 0.0104 * Math.sin(2 * B6)
        F -= 0.0074 * Math.sin(M5 - M6) - 0.0051 * Math.sin(M5 + M6)
        F += 0.0021 * Math.sin(2 * M5) + 0.0010 * Math.sin(2 * B6 - M6)
        F += 0.5 / 1440
        oldJ = julianDay
        julianDay = J0 + 28 * phase + Math.floor(F)
        phase = phase + 1
    }

    return (julianDate - oldJ) / daysInAMonth
}
