import { Formik } from 'formik';

type listItems = {
    quantity: number,
    productId: number,
};

const LemonadeStandForm = (props: any) => {
    return (
        <>
            <Formik
                initialValues={{
                    location: 0 as number,
                    totalCost: '' as string,
                    listItems: [] as Array<listItems>,
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {props}
            </Formik>
        </>
    );
}

export default LemonadeStandForm;