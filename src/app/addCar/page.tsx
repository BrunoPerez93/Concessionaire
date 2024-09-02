import { FormData } from "@/components/addCar/FormData";

type Props = {}

const AddCarPage = (props: Props) => {
    return (
        <section className="p-5 flex flex-col justify-center items-center w-full space-y-3">
            <h1 className="font-bold md:text-3xl text-xl">Agregar Auto</h1>
            <div className="w-2/3">
                <FormData />
            </div>
        </section>
    )
}

export default AddCarPage;