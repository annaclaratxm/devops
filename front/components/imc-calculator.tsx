"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IMCResult {
  value: number
  classification: string
  color: string
}

function calculateIMC(weight: number, height: number): IMCResult {
  const heightInMeters = height / 100
  const imc = weight / (heightInMeters * heightInMeters)
  
  let classification: string
  let color: string
  
  if (imc < 18.5) {
    classification = "Abaixo do peso"
    color = "text-blue-600"
  } else if (imc < 25) {
    classification = "Peso normal"
    color = "text-green-600"
  } else if (imc < 30) {
    classification = "Sobrepeso"
    color = "text-yellow-600"
  } else if (imc < 35) {
    classification = "Obesidade Grau I"
    color = "text-orange-600"
  } else if (imc < 40) {
    classification = "Obesidade Grau II"
    color = "text-red-500"
  } else {
    classification = "Obesidade Grau III"
    color = "text-red-700"
  }
  
  return { value: imc, classification, color }
}

export function IMCCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<IMCResult | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    setError("")
    setResult(null)

    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    if (!weight || !height) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    if (isNaN(weightNum) || isNaN(heightNum)) {
      setError("Por favor, insira valores numéricos válidos.")
      return
    }

    if (weightNum <= 0 || heightNum <= 0) {
      setError("Os valores devem ser maiores que zero.")
      return
    }

    if (heightNum < 50 || heightNum > 300) {
      setError("Altura deve estar entre 50 e 300 cm.")
      return
    }

    if (weightNum < 10 || weightNum > 500) {
      setError("Peso deve estar entre 10 e 500 kg.")
      return
    }

    const imcResult = calculateIMC(weightNum, heightNum)
    setResult(imcResult)
  }

  const handleClear = () => {
    setWeight("")
    setHeight("")
    setResult(null)
    setError("")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Calculadora de IMC</CardTitle>
        <CardDescription>
          Calcule seu Índice de Massa Corporal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Ex: 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="Ex: 175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            Calcular
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex-1">
            Limpar
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg text-center space-y-2">
            <p className="text-sm text-muted-foreground">Seu IMC é:</p>
            <p className="text-4xl font-bold">{result.value.toFixed(1)}</p>
            <p className={`text-lg font-semibold ${result.color}`}>
              {result.classification}
            </p>
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Classificação OMS:</p>
          <ul className="space-y-0.5">
            <li>• Abaixo de 18,5: Abaixo do peso</li>
            <li>• 18,5 - 24,9: Peso normal</li>
            <li>• 25,0 - 29,9: Sobrepeso</li>
            <li>• 30,0 - 34,9: Obesidade Grau I</li>
            <li>• 35,0 - 39,9: Obesidade Grau II</li>
            <li>• Acima de 40: Obesidade Grau III</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
