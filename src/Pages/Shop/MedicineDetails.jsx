import { useForm } from "react-hook-form";


const MedicineDetails = ({ medicineDetails }) => {
    

    return (
        <dialog id="medicinesDetails" className="modal modal-middle     mx-auto">
            <div className="modal-box p-0  h-2/3 ">
                <div className="  ">
                    <div className="">
                        <img className="w-full h-[250px]  p-0 m-0 rounded-lg" src={medicineDetails?.image}  alt="no image" />
                    </div>
                    <div className="m-5">
                        <h1 className="text-xl ">Name: <span className="font-bold">{medicineDetails?.itemName}</span></h1>
                        <h1 className="">Generic Name	: <span className="font-medium">{medicineDetails?.genericName}</span></h1>
                        <h1 className="">Category: <span className="font-medium">{medicineDetails?.category}</span></h1>
                        <h1 className="">Company: <span className="font-medium">{medicineDetails?.company}</span></h1>
                        <h1 className="">Mass Unit	: <span className="font-medium">{medicineDetails?.massUnit}</span></h1>
                        <h1 className="">Price PerUnit: <span className="font-medium">{medicineDetails?.pricePerUnit} tk</span></h1>
                        <h1 className="">Discount Percentage: <span className="font-medium">{medicineDetails?.pricePerUnit} tk</span></h1>
                        <h1 className="">Short Description: <span className="font-medium">{medicineDetails?.shortDescription}</span></h1>
                    </div>
                </div>

                <div className="modal-action  m-4">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button  className="btn btn-xl font-bold btn-outline ">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default MedicineDetails;