import { Gig } from "../models/gig.model";
import { SubCategory } from "../models/subCategory.model";
import { escapeRegex } from "../utils/escapeRegex";
interface IGigCursor{
    createdAt:string;
    _id:string;
} 
interface IGigParams{
    limit?:number;
    cursor?:IGigCursor;
    query?:string;
}
const searchServicesService = async(q:string) => {
 const query = q.trim();

 if(!query){
    return [];
 }
//  This will make regex query as literal like C++ to C\+\+ becuase in regex + means 1 or more tahn 1
 const escapedQuery = escapeRegex(query);
//  This will that escapedQuery adn make regex here "i" means not sensitive like C++ and c++ both are smae 
    const regex = new RegExp(`^${escapedQuery}`,"i"); 

  const [subCategories,gigs] =  await Promise.all([
        SubCategory.find({
            name:regex
        })
       
        .limit(5)
        .lean(),

        Gig.find({
            status:"published",
            title:regex
        })
       
        .limit(5)
        .lean()
    ]);

    const suggestions = [
        ...subCategories.map((subCategory) => ({
            type:"subCategory" as const,
            text:subCategory.name,
            slug:subCategory.slug
        })),

        ...gigs.map((gig) => ({
            type:"gig" as const,
            text:gig.title,
            gigId:gig._id
        }))
    ]

    //Removing duplicates
    const uniqueSuggestions = Array.from(
        new Map(
            suggestions.map((item) => [
                item.text.trim().toLowerCase(),
                item
            ])
        ).values()
    )

    return uniqueSuggestions.slice(0,8);
}


// Get gigs from search with cursor pagination

const getGigsWithCursorService = async({
    limit = 20,
    cursor,
    query
}:IGigParams) => {
    const safeLimit = Math.min(Math.max(limit,1),50);
    
    const filter :Record<string,unknown> = {
        status:"published"
    } 
 // If cursor exists, get documents AFTER the last
  // document from the previous request.
//   If createdAt is same then use _id as refrence to fetch next documents.

    if(query?.trim()){
        filter.title = {
            $regex:query.trim(),
            $options:"i"
        }
    }
    if(cursor){
        filter.$or = [
            {
                createdAt:{
                    $lt:new Date(cursor.createdAt)
                }
            },
            {
                createdAt: new Date(cursor.createdAt),
                _id:{
                    $lt:cursor._id
                }
            }
        ]
    }

    const gigs = await Gig.find(filter)
    .populate("provider", "name")
    .populate("category", "name slug")
    .populate("subCategory", "name slug")
    .sort({
      createdAt: -1,
      _id: -1,
    })
    .limit(safeLimit + 1)
    .lean();
    // We fetched one extra document only to know
  // whether another page exists.
    const hasMore = gigs.length > safeLimit;

    const results = hasMore ? gigs.slice(0,safeLimit) : gigs;

    let nextCursor:IGigCursor | null = null; 
    if(hasMore){
        // Select the last Gig
        const lastGig = results[results.length - 1];

        nextCursor = {
            createdAt : lastGig.createdAt.toISOString(),
            _id:lastGig._id.toString()
        };

    }

    return {
        gigs:results,
        nextCursor,
        hasMore
    }
}
export {searchServicesService,getGigsWithCursorService};