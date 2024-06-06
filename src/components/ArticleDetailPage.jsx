import React from 'react'

const ArticleDetailPage = () => {
  return (
    <div className="py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
        <div className="max-w-md mx-auto">
          <div className="divide-y divide-gray-300/50">
            <div className="py-4 text-base leading-6 text-gray-600">
              <p className="font-semibold text-lg">Title of the Article</p>
              <p className="text-gray-500">by Author Name</p>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetailPage