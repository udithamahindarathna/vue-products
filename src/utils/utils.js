
export function roundUpPrice(price) {
    if (!price) {
        return 0
    }

    return price.toFixed(2)
}

export function formatDateforDisplay(dateStr) {
    if (!dateStr) {
        return
    }

    return new Date(dateStr).toLocaleDateString("en-US", {
        timeZone: "Asia/Colombo",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    })
}