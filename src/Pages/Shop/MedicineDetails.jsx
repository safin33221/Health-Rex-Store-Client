import { useForm } from "react-hook-form";


const MedicineDetails = ({ medicineDetails }) => {
    console.log(medicineDetails);

    return (
        <dialog id="medicinesDetails" className="modal modal-top     mx-auto">
            <div className="modal-box relative  h-2/3 ">
                <div className="md:flex gap-4 ">
                    <div className="w-1/2">
                        <img className="w-full h-[250px]  p-0 m-0 rounded-lg" src={medicineDetails?.image}  alt="no image" />
                    </div>
                    <div>
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

                <div className="modal-action absolute bottom-10 right-10 ">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button  className="btn btn-outline btn-xl bg-primary">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default MedicineDetails;