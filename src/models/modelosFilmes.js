const z = require("zod")

const modeloFilmeV1 = z.object({
    title: z.string(),
    year: z.number(),
    cast: z.string(),
    genre: z.string(),
    href: z.string().nullable().default(""),
    extract: z.string().nullable().default(""),
    thumbnail: z.string().nullable().default(""),
    thumbnail_width: z.number().nullable().default(0),
    thumbnail_height: z.number().nullable().default(0)
})

module.exports = {
    modeloFilmeV1
}


