import {Resource} from "@/models/learning-resources/Resource.ts";
import {v4 as uuidv4} from "uuid";

export const storedResources: Array<Resource> = [
  new Resource(
    uuidv4(),
    'Official Guide',
    'The official Vue.js documentation',
    'https://vuejs.org/'
  ),
  new Resource(
    uuidv4(),
    'Vue.js Developers',
    'The official Vue.js documentation',
    'https://vuejsdevelopers.com/'
  ),
  new Resource(
    uuidv4(),
    'Vue.js News',
    'The official Vue.js documentation',
    'https://news.vuejs.org/'
  )
]
