// src/components/DoctorDetails.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorDetails = () => {
    





    const doctors = [
        {
            id: 1,
            name: "Dr. John Doe",
            specialization: "Cardiologist",
            workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
            contact: "(123) 456-7890",
            bio: "Dr. John Doe is an experienced Cardiologist with over 10 years of experience. He specializes in heart disease diagnosis and treatment."
        },
        {
            id: 2,
            name: "Dr. Jane Smith",
            specialization: "Dermatologist",
            workingHours: "Mon - Fri: 10:00 AM - 5:00 PM",
            contact: "(234) 567-8901",
            bio: "Dr. Jane Smith is a certified Dermatologist, specializing in skin care, acne treatments, and cosmetic dermatology."
        },
        {
            id: 3,
            name: "Dr. Sarah Lee",
            specialization: "Pediatrician",
            workingHours: "Mon - Sat: 8:00 AM - 4:00 PM",
            contact: "(345) 678-9012",
            bio: "Dr. Sarah Lee specializes in the care of children, providing preventive care and treating common illnesses."
        },
        {
            id: 4,
            name: "Dr. Michael Brown",
            specialization: "Orthopedic Surgeon",
            workingHours: "Mon - Fri: 9:00 AM - 7:00 PM",
            contact: "(456) 789-0123",
            bio: "Dr. Michael Brown is a leading Orthopedic Surgeon with expertise in bone fractures, joint replacements, and sports injuries."
        },
        {
            id: 5,
            name: "Dr. Emily Wilson",
            specialization: "Gynecologist",
            workingHours: "Mon - Fri: 9:00 AM - 5:00 PM",
            contact: "(567) 890-1234",
            bio: "Dr. Emily Wilson offers expert gynecological services including routine exams, family planning, and reproductive health."
        },
        {
            id: 6,
            name: "Dr. David Green",
            specialization: "Neurologist",
            workingHours: "Mon - Fri: 8:00 AM - 4:00 PM",
            contact: "(678) 901-2345",
            bio: "Dr. David Green specializes in diagnosing and treating nervous system disorders, including headaches, epilepsy, and multiple sclerosis."
        },
        {
            id: 7,
            name: "Dr. Linda Thomas",
            specialization: "Psychiatrist",
            workingHours: "Mon - Fri: 10:00 AM - 6:00 PM",
            contact: "(789) 012-3456",
            bio: "Dr. Linda Thomas is an experienced psychiatrist specializing in mental health, including anxiety, depression, and mood disorders."
        },
        {
            id: 8,
            name: "Dr. Robert Johnson",
            specialization: "ENT Specialist",
            workingHours: "Mon - Sat: 9:00 AM - 6:00 PM",
            contact: "(890) 123-4567",
            bio: "Dr. Robert Johnson treats a wide range of ear, nose, and throat conditions, including allergies, hearing loss, and sinus infections."
        },
        {
            id: 9,
            name: "Dr. Olivia Martinez",
            specialization: "Endocrinologist",
            workingHours: "Mon - Fri: 8:00 AM - 4:00 PM",
            contact: "(901) 234-5678",
            bio: "Dr. Olivia Martinez specializes in endocrine system disorders, including diabetes, thyroid problems, and hormone imbalances."
        },
        {
            id: 10,
            name: "Dr. William Harris",
            specialization: "Urologist",
            workingHours: "Mon - Fri: 9:00 AM - 5:00 PM",
            contact: "(012) 345-6789",
            bio: "Dr. William Harris is a skilled urologist with expertise in urinary tract infections, kidney stones, and male reproductive health."
        }
    ];


    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Healthcare Professionals at Your Service
                </h1>
                <p className="mt-4 text-lg md:text-xl ">
                Find the perfect specialist for your health and wellness needs.
                </p>

            </div>

            {/* Doctor's Profile Information */}
            <div className="grid grid-cols-1  gap-10">
                {
                    doctors.map((doctor,idx) => <div key={idx} className=" border  p-6 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <div className="w-24 h-24 bg-base-300 rounded-full mr-6">
                                
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold ">{doctor.name}</h3>
                                <p className="text-lg ">{doctor.specialization}</p>
                                <p className="">Available: {doctor.workingHours}</p>
                                <p className="">Contact: {doctor.contact}</p>
                            </div>
                        </div>

                        {/* Doctor’s Bio */}
                        <div className="mb-6">
                            <h4 className="text-xl font-semibold  mb-4">About {doctor.name}</h4>
                            <p className="">{doctor.bio}</p>
                        </div>

                        {/* Book Appointment Button */}

                    </div>)
                }
            </div>
        </div>
    );
};

export default DoctorDetails;
