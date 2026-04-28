// I want this production ready scable to show any error like 401,403,404,500 etc. and also show custom message for each error code. I want to use this component in my routes when user is not authorized to access the page or when page is not found or when there is server error etc.
function UnAuthorizedPage() { 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">401</h1>
            <p className="text-2xl text-gray-700 mt-4">Unauthorized Access</p>
            <p className="text-gray-500 mt-2">You do not have permission to view this page.</p>
        </div>
    );      
}

export default UnAuthorizedPage;