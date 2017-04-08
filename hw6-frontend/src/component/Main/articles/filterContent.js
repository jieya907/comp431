

export const filterContent = (contents, keyword) => {

    if (contents) {
        return contents.filter((card) => {
            if (!keyword || card.author.includes(keyword)|| card.text.includes(keyword))
                return true
        })
    }
}
