"use client";

import { useState, useEffect } from "react";
import { Clock, Globe, Tag, ExternalLink, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const apiKey = "pub_2b177620e5f44f99b4a3849678a91335&q";
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${apiKey}=khmer&country=kh,kr`,
          { cache: "no-store" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Error fetching news data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchNewsData();
  }, []);

  const getUniqueCategories = () => {
    if (!data || !data.results) return [];
    const categories = new Set();
    data.results.forEach(article => {
      article.category?.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  };

  const filteredArticles = data?.results?.filter(article => {
    if (selectedCategory === "all") return true;
    return article.category?.includes(selectedCategory);
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto animation-delay-75"></div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Loading Latest News</h1>
          <p className="text-purple-300">Fetching the latest stories for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-red-900/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-red-300 mb-2">Oops! Something went wrong</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.totalResults === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-blue-900/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-blue-300 mb-2">No Stories Found</h1>
          <p className="text-blue-400">No news articles available at the moment</p>
        </div>
      </div>
    );
  }

  const categories = getUniqueCategories();

  return (
    <div className="">
      {/* Articles Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
          {filteredArticles.map((article, index) => (
            <article
              key={article.article_id}
              className="group relative 1rounded-2xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              {article.image_url && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {article.category?.[0] || "News"}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {article.title}
                  </a>
                </h2>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {article.description || "No description available"}
                </p>

                {/* Metadata */}
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">{article.source_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(article.pubDate).toLocaleDateString()}</span>
                  </div>
                  
                  {article.country && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{article.country.join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Read More Button */}
                <div className="mt-6">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
    </div>

   
    </div>
  );
}