import React, { useEffect, useState } from "react";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import logo from "../../assets/logo.png";

const Invoice = () => {
    const { paymentDetails } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [medicines, setMedicines] = useState([]);
    const medicineIds = paymentDetails?.medicineId || [];

    // Fetch medicines data
    useEffect(() => {
        if (medicineIds.length > 0) {
            axiosPublic.post("/invoice/medicine", medicineIds)
                .then((res) => setMedicines(res.data));
        }
    }, [medicineIds]);

    // PDF Styles
    const styles = StyleSheet.create({
        page: { padding: 20, fontSize: 12, backgroundColor: "#fff" },
        container: {
            margin: "auto",
            padding: 14,
            border: "1px solid #ccc",
            borderRadius: 8,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #ccc",
            paddingBottom: 10,
            marginBottom: 20,
        },
        logoSection: { flexDirection: "row", alignItems: "center", gap: 10 },
        logo: { width: 60, height: 60 },
        title: { fontSize: 18, fontWeight: "bold" },
        subtitle: { color: "#666" },
        customerDetails: { marginBottom: 20 },
        sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
        text: { marginBottom: 5 },
        table: { marginTop: 10, borderWidth: 1, borderColor: "#ddd" },
        tableRow: { flexDirection: "row", borderBottom: "1px solid #ddd" },
        tableHeader: { backgroundColor: "#f0f0f0" },
        tableCell: {
            padding: 5,
            flex: 1,
            fontSize: 10,
            borderRight: "1px solid #ddd",
        },
        total: {
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            borderTop: "1px solid #ccc",
            paddingTop: 10,
        },
        footer: { textAlign: "center", fontSize: 10, marginTop: 20, color: "#888" },
    });

    // PDF Document Component
    const InvoicePDF = (
        <Document>
            <Page style={styles.page}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoSection}>
                            <Image style={styles.logo} src={logo} />
                            <View>
                                <Text style={styles.title}>HealthRxStore</Text>
                                <Text style={styles.subtitle}>Your Trusted Medicine Partner</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Date: {new Date().toLocaleDateString()}</Text>
                            <Text>Invoice ID: #123456</Text>
                        </View>
                    </View>

                    {/* Customer Details */}
                    <View style={styles.customerDetails}>
                        <Text style={styles.sectionTitle}>Customer Details</Text>
                        <Text style={styles.text}>Name: {paymentDetails?.name}</Text>
                        <Text style={styles.text}>Email: {paymentDetails?.email}</Text>
                    </View>

                    {/* Order Summary */}
                    <View>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.table}>
                            {/* Table Header */}
                            <View style={[styles.tableRow, styles.tableHeader]}>
                                <Text style={styles.tableCell}>#</Text>
                                <Text style={styles.tableCell}>Item Name</Text>
                                <Text style={styles.tableCell}>Quantity</Text>
                                <Text style={styles.tableCell}>Price</Text>
                                <Text style={styles.tableCell}>Total</Text>
                            </View>
                            {/* Table Rows */}
                            {medicines?.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                    <Text style={styles.tableCell}>{item.itemName}</Text>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>${item.price}</Text>
                                    <Text style={styles.tableCell}>
                                        {item.quantity * item.price} tk
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Total */}
                    <View style={styles.total}>
                        <Text>Tax: 00 tk</Text>
                        <Text>Discount: 00 tk</Text>
                        <Text>Total: {paymentDetails?.totalPrice} tk</Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Thank you for shopping with us!</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="w-10/12 mx-auto my-16">
            <div className="text-right mt-8">
                <PDFDownloadLink
                    document={InvoicePDF}
                    fileName="invoice.pdf"
                    className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-green-600"
                >
                    {({ loading }) => (loading ? "Generating PDF..." : "Download Invoice")}
                </PDFDownloadLink>
            </div>
            {/* Display Invoice Content */}
            <div className=" ">
                <div className="max-w-4xl mx-auto p-6  border shadow-md rounded-lg">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <div className="flex gap-3 items-center ">
                            <img className="w-24" src={logo} alt="" />
                            <div>
                                <h1 className="text-2xl font-bold ">HealthRxStore</h1>
                                <p className="">Your Trusted Medicine Partner</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm >
                                {/* <strong>Date:</strong> {date} */}
                            </p>
                            <p className="text-sm >
                                {/* <strong>Invoice ID:</strong> {invoiceId} */}
                            </p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold ">Customer Details</h2>
                        <p className="">
                            <strong>Name:</strong>  {paymentDetails?.name}
                        </p>
                        <p className="">
                            <strong>Email:</strong>  {paymentDetails?.email}
                        </p>

                    </div>

                    {/* Order Details */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold ">Order Summary</h2>
                        <table className="w-full border-collapse border  mt-4">
                            <thead className="">
                                <tr>
                                    <th className="border  p-2 text-left">#</th>
                                    <th className="border  p-2 text-left">Item Name</th>
                                    <th className="border  p-2 text-left">Quantity</th>
                                    <th className="border  p-2 text-left">Price</th>
                                    <th className="border  p-2 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines?.map((item, index) => (
                                    <tr key={item.id} className="">
                                        <td className="border  p-2">{index + 1}</td>
                                        <td className="border  p-2">{item.itemName}</td>
                                        <td className="border  p-2">{item.quantity}</td>
                                        <td className="border  p-2">${item.price}</td>
                                        <td className="border  p-2">
                                            {item.quantity * item.price} tk
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-end mt-6">
                        <div className="w-full max-w-sm">

                            <div className="flex justify-between p-2 border-t ">
                                <span className=" font-semibold">Tax: 00</span>
                                <span>tk</span>
                            </div>
                            <div className="flex justify-between p-2 border-t ">
                                <span className=" font-semibold">Discount: 00</span>
                                <span>tk</span>
                            </div>
                            <div className="flex justify-between p-2 border-t border-b ">
                                <span className="text-lg font-bold ">Total: {paymentDetails?.totalPrice}</span>
                                <span className="text-lg font-bold text-black">tk</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm ">
                        Thank you for shopping with us!
                    </div>
                </div>
            </div>

            {/* PDF Download Button */}

        </div>
    );
};

export default Invoice;
