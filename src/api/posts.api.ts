import axios from 'axios'

const URL = 'http://185.105.91.162/api/'

// get all posts
export async function getAllPosts() {
    return await axios.get(URL + `posts-list/?limit=1000`)    
}

// filter posts
export async function getPostsByFilter(from_location: string, to_location: string, go_time: string, count: number){
    // with all params
    if(from_location !== undefined && to_location !== undefined && go_time !== undefined && count !== undefined) {
        return await axios.get(URL + `posts-list/?from_location=${from_location}&to_location=${to_location}&go_time=${go_time}&count=${count}`)
    }
    // without go_time
    if(from_location !== undefined && to_location !== undefined && count !== undefined) {
        return await axios.get(URL + `posts-list/?from_location=${from_location}&to_location=${to_location}&count=${count}`)
    }
    // without count
    if(from_location !== undefined && to_location !== undefined && go_time !== undefined) {
        return await axios.get(URL + `posts-list/?from_location=${from_location}&to_location=${to_location}&go_time=${go_time}`)
    }
    //without count and go_time
    if(from_location !== undefined && to_location !== undefined) {
        return await axios.get(URL + `posts-list/?from_location=${from_location}&to_location=${to_location}`)
    }
    if(from_location !== undefined) {
        return await axios.get(URL + `posts-list/?from_location=${from_location}`)
    }
    if(to_location !== undefined) {
        return await axios.get(URL + `posts-list/?to_location=${to_location}`)
    }
}

// get user posts
export async function getUserPosts(access: string) {
    return await axios.get(URL + `posts/?limit=12`, { headers: {
        'Authorization': `Bearer ${access}`
    }})
}

// delete post
export async function deletePost(access: string, id: number) {
    return await axios.patch(URL + 'posts/' + id + '/', { status: 0 }, { headers: {
        'Authorization': `Bearer ${access}`
    }})
}

// create post
export async function createPost(access: string, user_role: number, from_location: string, to_location: string, go_time: string, count: number, price: string, addition: string) {
    const data = { user_role, from_location, to_location, go_time, count, price, addition }
    return await axios.post(URL + 'posts/', data, { headers: {
            'Authorization': `Bearer ${access}`
        }})
}

// edit post 
export async function editPost(id: number, access: string, user_role: number, from_location: string, to_location: string, go_time: string, count: number, price: string, addition: string) {
    const data = { user_role, from_location, to_location, go_time, count, price, addition }
    return await axios.put(URL + 'posts/' + id + '/', data, { headers: {
            'Authorization': `Bearer ${access}`
        }})
}
