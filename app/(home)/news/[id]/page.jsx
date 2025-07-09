const DetailNewsbaseOnId = async ({params}) =>{
    const id = (await params).id;
    return (
        <>      
        a {id}
        </>
    )
}
export default DetailNewsbaseOnId;