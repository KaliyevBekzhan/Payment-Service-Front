type Props = {
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    onLoadMore: () => void;
};

export const PaginationControls = ({
                                       hasNextPage,
                                       isFetchingNextPage,
                                       onLoadMore
                                   }: Props) => {

    if (!hasNextPage) return null;

    return (
        <div className="flex justify-center p-6">
            <button
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
                className="px-6 py-3 bg-black text-white rounded-xl"
            >
                {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
            </button>
        </div>
    );
};