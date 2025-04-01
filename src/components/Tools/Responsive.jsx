export default function ResponsiveTool() {
    return (
        <div className='fixed top-[50%] left-0 z-50 h-10 w-10 bg-red-500 flex items-center justify-center'>
            <span className="before:content-['/'] xs:before:content-['XS'] sm:before:content-['SM'] md:before:content-['MD'] lg:before:content-['LG'] xl:before:content-['XL'] 2xl:before:content-['XXL']"></span>
        </div>
    );
}
