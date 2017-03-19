

export const filterContent = (contents, keyword) => {

    return contents.filter((card) => {
        if (!keyword || card.author === keyword || card.text.includes(keyword))
            return true
    })
}
