import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const SalesReports = () => {
    const axiosPublic = useAxiosPublic()
    const tableRef = useRef(null);
    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await axiosPublic.get('/sales-reports')
            return res.data
        }
    })
    return (
        <div className='w-10/12 mx-auto'>
            <div className='flex justify-around py-10 items-center'>
                <h1>Total Sales Reports: {sales?.length}</h1>
                <DownloadTableExcel
                    filename="sales_reports"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                    <button className='btn bg-primary hover:bg-green-600 '> Export excel </button>

                </DownloadTableExcel>
            </div>
            <div className="overflow-x-auto">
                <table ref={tableRef} className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Seller Email</th>
                            <th>Buyer Email</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item?.salesInfo?.itemName}</td>
                                <td>{item?.salesInfo?.email}</td>
                                <td>{item?.email}</td>
                                <td>{item?.totalPrice} BTD</td>


                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SalesReports;