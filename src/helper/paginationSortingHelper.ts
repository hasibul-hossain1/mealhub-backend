import React from 'react'

interface Options {
    page?:string;
    limit?:string;
}

export function paginationSortingHelper(options:Options) {
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 10;
    const skip = (page - 1) * limit;
    const take = limit;
    return {
        page,
        skip,
        take
    }
}
