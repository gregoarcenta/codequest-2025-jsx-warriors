"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";

const allFaqs = [
  {
    question: "¿Qué es el blog de DevTalles?",
    answer:
      "El blog de DevTalles es un espacio donde compartimos artículos técnicos, tutoriales, mejores prácticas y las últimas tendencias en desarrollo de software. Nuestro objetivo es mantener a la comunidad actualizada con contenido de calidad.",
  },
  {
    question: "¿Con qué frecuencia publican nuevos artículos?",
    answer:
      "Publicamos nuevo contenido de forma regular, típicamente 2-3 artículos por semana. También tenemos series especiales y artículos destacados que se publican según los eventos y tendencias de la industria.",
  },
  {
    question:
      "¿Puedo suscribirme para recibir notificaciones de nuevos artículos?",
    answer:
      "Sí, puedes suscribirte a nuestro newsletter para recibir notificaciones cuando publiquemos nuevos artículos. También puedes seguirnos en redes sociales para estar al día con las últimas publicaciones.",
  },
  {
    question: "¿Cómo puedo comentar en los artículos?",
    answer:
      "Para comentar en los artículos necesitas crear una cuenta en DevTalles. Una vez registrado, podrás dejar comentarios, responder a otros usuarios y participar en las discusiones de la comunidad.",
  },
  {
    question: "¿Puedo compartir los artículos en redes sociales?",
    answer:
      "¡Por supuesto! Todos nuestros artículos incluyen botones para compartir en las principales redes sociales. También puedes copiar el enlace del artículo y compartirlo donde quieras.",
  },
  {
    question: "¿Qué temas cubren en el blog?",
    answer:
      "Cubrimos una amplia gama de temas relacionados con el desarrollo de software: React, Node.js, JavaScript, TypeScript, Python, bases de datos, DevOps, arquitectura de software, y muchos más temas relevantes para desarrolladores.",
  },
  {
    question: "¿Puedo buscar artículos por tema o categoría?",
    answer:
      "Sí, el blog incluye un sistema de búsqueda que te permite encontrar artículos por palabras clave, temas específicos o nombres de tecnologías. También puedes filtrar por categorías y etiquetas.",
  },
  {
    question: "¿Los artículos están disponibles en diferentes idiomas?",
    answer:
      "Actualmente nuestro contenido está principalmente en español, pero estamos considerando expandir a otros idiomas en el futuro basándose en la demanda de nuestra comunidad.",
  },
  {
    question: "¿Puedo proponer temas para futuros artículos?",
    answer:
      "¡Absolutamente! Valoramos mucho las sugerencias de nuestra comunidad. Puedes enviarnos tus ideas a través de la página de contacto o dejando comentarios en los artículos existentes.",
  },
  {
    question: "¿Tienen artículos para principiantes?",
    answer:
      "Sí, tenemos contenido para todos los niveles. Marcamos claramente los artículos según su nivel de dificultad: principiante, intermedio y avanzado, para que puedas encontrar contenido apropiado para tu nivel.",
  },
  {
    question: "¿Puedo guardar artículos para leer más tarde?",
    answer:
      "Con una cuenta registrada, puedes marcar artículos como favoritos y crear tu propia lista de lectura para acceder fácilmente al contenido que te interesa.",
  },
  {
    question: "¿Cómo puedo seguir a autores específicos?",
    answer:
      "En cada artículo puedes ver el perfil del autor. Desde ahí puedes seguir a tus autores favoritos para recibir notificaciones cuando publiquen nuevo contenido.",
  },
];

export default function ListQuestions() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative -mt-8 pb-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md relative z-10">
            <CardContent className="p-8 md:p-12">
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center">
                    Preguntas y Respuestas
                  </h2>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar preguntas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <p className="text-slate-600 dark:text-slate-300">
                      {searchTerm
                        ? `${filteredFaqs.length} resultado${
                            filteredFaqs.length !== 1 ? "s" : ""
                          } para "${searchTerm}"`
                        : `${filteredFaqs.length} preguntas frecuentes`}
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-slate-900 dark:text-white pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              )}

              {/* Quick Support */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Nuestro equipo de soporte está aquí para ayudarte
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 h-12 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200"
                    >
                      <Link href="/contactanos">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contactar Soporte
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 h-12 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                    >
                      <Link href="mailto:soporte@devtalles.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
