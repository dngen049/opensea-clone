import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'dncatutx',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token:
        'sklQ3NFhU5bcKEhuQRtvgazkbYfppnnmIo3PJwJm4hpxUXNWnHQyURRFhW8e0Gm6dpxXeMs2Jh04Rmnmt4GQuBfGBx8ZHfsgffFvAXiQtWqaoxk0t3VWxfMaEGNqTFRwNw6pSHjXSrmGC0zXaZQlHodM639ttGLa8l8VfHTKKxH4ddDiC0pB',
    useCdn: false,
})