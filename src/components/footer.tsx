import {navLinks, otherLinks, policyLinks, socialMediaLinks} from "@/data/links.data";
import Link from 'next/link';
import {brandingData} from "@/data/branding.data";
import Image from "next/image";

export default function Footer(){
    return (
        <footer className="py-20 relative px-8 lg:px-[128px]">
            <div className="mx-auto">
                {/* Four Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* First Column - Branding Data */}
                    <div>
                        <Image className="pb-3" src='/assets/branding/withkm-logo.svg' alt="withkm-logo" width={140} height={28}/>
                        <p className="text-gray-600 mb-2">{brandingData.tagline}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>{brandingData.address}</p>
                            <p>{brandingData.email}</p>
                            <p>{brandingData.phone}</p>
                        </div>
                    </div>

                    {/* Second Column - Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        href={link.url}
                                        className="text-gray-600 hover:text-gray-900 text-sm"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Third Column - Social Media Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Social Links</h3>
                        <div className="space-y-2">
                            {socialMediaLinks.map((link, index) => (
                              <div key={index}>
                                  <Link
                                    href={link.url}
                                    className="text-gray-600 hover:text-gray-900 text-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                      {link.label}
                                  </Link>
                              </div>
                            ))}
                        </div>
                    </div>

                    {/* Fourth Column - Other Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Other Sites</h3>
                        <div className="space-y-2">
                            {otherLinks.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        href={link.url}
                                        className="text-gray-600 hover:text-gray-900 text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-300 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* All Rights Reserved - Right Side */}
                        <div className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} withkm. All rights reserved.
                        </div>
                        {/* Policy Links - Right Side */}
                        <div className="flex space-x-4 mb-4 md:mb-0">
                            {policyLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="text-gray-600 hover:text-gray-900 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}