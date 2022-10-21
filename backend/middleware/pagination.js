function paginatedResult(model) {
    return async(req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit;

        const result = {};
        const totalItems = await model.countDocuments().exec()
        if(totalItems=== 0){
           return res.json({message:"Please upload products first."})
        }
        if(page){
            result.currentPage = page;
        }
        if(limit){
        result.totalPages = Math.round(totalItems/limit);
        }
        result.totalItems = totalItems;
        

        // console.log("result ", result)
        try {
            const data = await model.find().limit(limit).skip(startIndex).exec()
            result.currentItems = data.length;
            result.data = data;
            res.paginatedResult = result;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = paginatedResult;