
const Form = ({ handleSubmit, error, agenda, handleChange }) => {
    return (
        <>
            <div className="text-danger">{error}</div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900" >Tu nombre</label>
                                <div className="mt-2">
                                    <input value={agenda.NombreCliente} onChange={handleChange} id="name" name="NombreCliente" type="text" autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Tu numero de celular</label>
                                <div className="mt-2">
                                    <input value={agenda.NumeroCliente} onChange={handleChange} type="text" name="NumeroCliente" id="phone-numbe" autoComplete="phone-number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>




                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirmar Cita</button>
                        </div>
                    </div>
                </div>
            </form>

        </>

    )
}



export default Form;