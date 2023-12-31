import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVouchersAsync, updateCustomer } from '@src/Redux/Slice/Admin/customerSlice';
import { editCustomerAPI } from '@src/Redux/Api/Admin/customerApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import closed from '../../../assets_/icons/CloseIcon.svg';
import { getGroupsAsync } from '@src/Redux/Slice/Admin/getGroupSlice';
import { MultiSelect } from "react-multi-select-component";
import toast from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';


export const Editpopup = ({ closePopup, voucherData }: any) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [editedData, setEditedData] = useState({ ...voucherData });

  useEffect(() => {
    setValue('group', editedData.group);
  }, [editedData, setValue]);


  const onSubmit: SubmitHandler<any> = (data) => {
    const editData = {
      id: voucherData._id,
      group: data.group,
    };
    dispatch(updateCustomer(editData)).then((res: any) => {



      if (res.payload.status) {
        console.log("haaaa", res.payload)
        toast.success(res.payload.message)
        dispatch(getVouchersAsync());
        closePopup();
      }
      else {
        toast.error(res.payload.message)

      }
    });
  };

  const groupsData = useSelector((state: any) => state?.groups?.data);

  console.log("hello", groupsData);

  const filteredGroups = groupsData?.filter((element: any) => element.role !== "GODOWN_ASSISTANT");


  useEffect(() => {
    dispatch(getGroupsAsync());
  }, [dispatch]);


  const handleGroupSelect = (selectedList: any, selectedItem: any) => {
    setValue('group', selectedList.map((item: any) => item.id));
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='flex flex-col gap-[20px] '>
        <div>
          <h2 className="text-xl  font-bold">Edit Vouchers</h2>
        </div>



        <div className='flex flex-col gap-[10px]'>
          <span>Group</span>
          {/* <select className='outline-none border rounded-[8px]'
            {...register('group', { required: 'group is required' })}

          >
            {filteredGroups && filteredGroups.map((element: any, index: any) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select> */}


          <Multiselect
            options={filteredGroups}
            selectedValues={filteredGroups?.group}
            onSelect={handleGroupSelect}
            onRemove={(selectedList, removedItem) => {
            }}
            displayValue="name"
          />
        </div>


        <div className='flex justify-end gap-[10px]'>
          <button
            onClick={closePopup}
            className="absolute -right-3 top-[-15px] p-[5px] flex items-center justify-center bg-[#FFFFFF] rounded-full cursor-pointer"
          >
            <img src={closed} alt="" />
          </button>
          <button type="submit" className='px-[20px] py-[10px] bg-[#005D7F] text-white rounded-[5px] '>
            Update
          </button>
        </div>
      </div>
    </form>
  );
};
