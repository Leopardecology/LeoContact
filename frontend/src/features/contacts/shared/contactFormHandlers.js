export const handleContactChange = (e, contactData, setContactData) => {
    const {name, value} = e.target;
    setContactData({...contactData, [name]: value});
};

export const handleCheckboxChange = (e, contactData, setContactData) => {
    const {name, checked} = e.target;
    setContactData({...contactData, [name]: checked});
};

export const handleAddressChange = (e, name, value, contactData, setContactData) => {
    if (e) {
        const {name, value} = e.target;
        setContactData({
            ...contactData,
            address: {...contactData.address, [name]: value},
        });
    } else {
        setContactData({
            ...contactData,
            address: {...contactData.address, [name]: value},
        });
    }
};
