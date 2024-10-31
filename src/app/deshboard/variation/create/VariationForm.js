const VariaionForm = () => {

    
    return(
        <div className="p-5 bg-gray-100 flex justify-center">
        <div className="w-full max-w-5xl bg-white  rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Create Variations</h2>
            <div className="flex justify-center items-left ">
                        <div className="bg-white p-6 rounded-lg  w-full max-w-3xl">
                            <h2 className="text-lg font-semibold mb-4">Add Variations</h2>
                            <div className="grid grid-cols-1 gap-4 mb-4">
                           
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Variant Name</label>
                                    <input type="text" placeholder="Enter Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                             
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Attribute</label>
                                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option>Dropdown</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Save Change</button>
                            </div>
                        </div>
                    </div>
    
            </div>
            </div>
    
    
    )
    
    }
    export default VariaionForm;